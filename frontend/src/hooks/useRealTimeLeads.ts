'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { playNotificationPing } from '@/lib/sound';
import { LeadItem } from '@/lib/repository';
import { BACKEND_URL, apiRequest } from '@/lib/api';

export interface UseRealTimeLeadsReturn {
  leads: LeadItem[];
  latestNewLead: LeadItem | null;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  transportType: 'Socket.io' | 'Server-Sent Events' | 'Offline';
  soundEnabled: boolean;
  toggleSound: () => void;
  testSound: () => void;
  clearLatestNewLead: () => void;
  refreshLeads: () => Promise<void>;
  updateLeadStatusAction: (id: string, status: string, note?: string) => Promise<boolean>;
  deleteLeadAction: (id: string) => Promise<boolean>;
  simulateTestLead: () => Promise<void>;
  loading: boolean;
}

export function useRealTimeLeads(statusFilter?: string, searchQuery?: string): UseRealTimeLeadsReturn {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [latestNewLead, setLatestNewLead] = useState<LeadItem | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [transportType, setTransportType] = useState<'Socket.io' | 'Server-Sent Events' | 'Offline'>('connecting' as any);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const socketRef = useRef<Socket | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const soundEnabledRef = useRef<boolean>(true);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sunshade_lead_sound');
      if (saved !== null) {
        setSoundEnabled(saved === 'true');
      }
    } catch {
      // ignore localStorage error
    }
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sunshade_lead_sound', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const testSound = () => {
    playNotificationPing();
  };

  const clearLatestNewLead = () => {
    setLatestNewLead(null);
  };

  // Fetch initial leads from Backend API
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== 'All') params.set('status', statusFilter);
      if (searchQuery && searchQuery.trim()) params.set('search', searchQuery.trim());

      const data = await apiRequest(`/api/leads?${params.toString()}`);
      if (data && data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to load leads from backend:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Handle incoming new lead
  const handleIncomingLead = useCallback((lead: LeadItem) => {
    if (soundEnabledRef.current) {
      playNotificationPing();
    }
    setLatestNewLead(lead);

    setLeads((prev) => {
      if (prev.some((item) => item._id === lead._id)) {
        return prev;
      }
      return [lead, ...prev];
    });
  }, []);

  // Handle lead update
  const handleIncomingUpdate = useCallback((updatedLead: LeadItem) => {
    setLeads((prev) =>
      prev.map((item) => (item._id === updatedLead._id ? updatedLead : item))
    );
  }, []);

  // Handle lead deletion
  const handleIncomingDelete = useCallback((payload: { id: string }) => {
    setLeads((prev) => prev.filter((item) => item._id !== payload.id));
  }, []);

  // Connect to Backend Socket.io or direct SSE on Vercel
  useEffect(() => {
    let isConnectedWithSocket = false;

    if (BACKEND_URL && BACKEND_URL.startsWith('http')) {
      try {
        const socket = io(BACKEND_URL, {
          path: '/socket.io',
          transports: ['websocket', 'polling'],
          timeout: 4000,
          reconnectionAttempts: 2,
        });
        socketRef.current = socket;

        socket.on('connect', () => {
          isConnectedWithSocket = true;
          setConnectionStatus('connected');
          setTransportType('Socket.io');
        });

        socket.on('new_lead', (lead) => {
          handleIncomingLead(lead);
        });

        socket.on('lead_updated', (lead) => {
          handleIncomingUpdate(lead);
        });

        socket.on('lead_deleted', (payload) => {
          handleIncomingDelete(payload);
        });

        socket.on('connect_error', () => {
          if (!isConnectedWithSocket && !eventSourceRef.current) {
            initSSE();
          }
        });
      } catch {
        initSSE();
      }
    } else {
      initSSE();
    }

    function initSSE() {
      try {
        const streamUrl = BACKEND_URL ? `${BACKEND_URL}/api/leads/stream` : '/api/leads/stream';
        const es = new EventSource(streamUrl);
        eventSourceRef.current = es;

        es.addEventListener('connected', () => {
          setConnectionStatus('connected');
          setTransportType('Server-Sent Events');
        });

        es.addEventListener('lead:created', (e) => {
          try {
            const data = JSON.parse(e.data);
            handleIncomingLead(data);
          } catch (err) {
            console.error('SSE parse error:', err);
          }
        });

        es.addEventListener('lead:updated', (e) => {
          try {
            const data = JSON.parse(e.data);
            handleIncomingUpdate(data);
          } catch (err) {
            console.error('SSE parse error:', err);
          }
        });

        es.addEventListener('lead:deleted', (e) => {
          try {
            const data = JSON.parse(e.data);
            handleIncomingDelete(data);
          } catch (err) {
            console.error('SSE parse error:', err);
          }
        });

        es.onerror = () => {
          setConnectionStatus('disconnected');
          setTransportType('Offline');
        };
      } catch (err) {
        console.error('Failed to initialize SSE:', err);
        setConnectionStatus('disconnected');
        setTransportType('Offline');
      }
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (eventSourceRef.current) eventSourceRef.current.close();
    };
  }, [handleIncomingLead, handleIncomingUpdate, handleIncomingDelete]);

  // Lead Actions
  const updateLeadStatusAction = async (id: string, status: string, note?: string): Promise<boolean> => {
    try {
      const data = await apiRequest(`/api/leads/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, note }),
      });
      if (data && data.success) {
        handleIncomingUpdate(data.lead);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to update lead:', err);
      return false;
    }
  };

  const deleteLeadAction = async (id: string): Promise<boolean> => {
    try {
      const data = await apiRequest(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      if (data && data.success) {
        handleIncomingDelete({ id });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Failed to delete lead:', err);
      return false;
    }
  };

  // Instant simulator for client/testing demonstration
  const simulateTestLead = async (): Promise<void> => {
    const demoNames = [
      { name: 'Dr. Srinivas Reddy', loc: 'Gachibowli Financial District, Hyderabad', type: 'Commercial Tensile Car Parking Sheds', area: 2400 },
      { name: 'Meghana Rao', loc: 'Jubilee Hills Road No. 36, Hyderabad', type: 'Conical Gazebo & Tensile Umbrella Canopies', area: 650 },
      { name: 'Praveen Varma', loc: 'IDA Cherlapally Phase III, Hyderabad', type: 'Pre-Engineered Industrial Steel Sheds', area: 8500 },
      { name: 'K. Venkateshwarlu', loc: 'Banjara Hills, Hyderabad', type: 'Resort Swimming Pool Shade Sails', area: 1200 },
    ];
    const picked = demoNames[Math.floor(Math.random() * demoNames.length)];

    await apiRequest('/api/leads', {
      method: 'POST',
      body: JSON.stringify({
        fullName: picked.name,
        email: `${picked.name.toLowerCase().replace(/[^a-z]/g, '')}@example.com`,
        phone: `+91 ${Math.floor(9000000000 + Math.random() * 999999999)}`,
        city: 'Hyderabad',
        structureType: picked.type,
        fabricMaterial: 'PVDF Membrane Grade A (900 GSM Mehler)',
        estimatedArea: picked.area,
        projectBudgetBracket: `₹${(picked.area * 380).toLocaleString('en-IN')} - ₹${(picked.area * 460).toLocaleString('en-IN')}`,
        siteVisitRequested: true,
        addressOrSiteLocation: picked.loc,
        message: 'Live test inquiry triggered from Sunshade Solutions Admin Live Simulator.',
      }),
    });
  };

  return {
    leads,
    latestNewLead,
    connectionStatus,
    transportType,
    soundEnabled,
    toggleSound,
    testSound,
    clearLatestNewLead,
    refreshLeads: fetchLeads,
    updateLeadStatusAction,
    deleteLeadAction,
    simulateTestLead,
    loading,
  };
}
