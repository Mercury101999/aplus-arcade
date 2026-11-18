import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import type { Question } from '@/content/types';
import {
  applyAnswer,
  completeRound as finishRound,
  emptyProgress,
  type Achievement,
  type AnswerInput,
  type AnswerResult,
  type ProgressState,
  type RoundSummary,
} from '@/game/progress';
import { loadProgress, saveProgress } from '@/storage/progress-store';

interface ProgressContextValue {
  ready: boolean;
  state: ProgressState;
  saveError: string | null;
  recordAnswer: (question: Question, input: AnswerInput) => AnswerResult;
  completeRound: (summary: RoundSummary) => { unlocked: Achievement[] };
  reset: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const stateRef = useRef(state);
  const saveChain = useRef(Promise.resolve());
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadProgress()
      .then((loaded) => {
        if (cancelled) return;
        stateRef.current = loaded;
        setState(loaded);
        setReady(true);
      })
      .catch(() => {
        if (cancelled) return;
        setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function persist(next: ProgressState) {
    stateRef.current = next;
    setState(next);
    saveChain.current = saveChain.current
      .catch(() => undefined)
      .then(() => saveProgress(next))
      .then(() => {
        if (mounted.current) setSaveError(null);
      })
      .catch(() => {
        if (mounted.current) setSaveError('Progress could not be saved on this device.');
      });
  }

  const value: ProgressContextValue = {
    ready,
    state,
    saveError,
    recordAnswer(question, input) {
      const applied = applyAnswer(stateRef.current, question, input, new Date());
      persist(applied.state);
      return applied;
    },
    completeRound(summary) {
      const applied = finishRound(stateRef.current, summary);
      persist(applied.state);
      return { unlocked: applied.unlocked };
    },
    async reset() {
      persist(emptyProgress());
    },
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const value = useContext(ProgressContext);
  if (!value) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return value;
}
