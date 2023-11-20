import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { State, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const usePrevious = (value: string) => {
  const ref = useRef('');
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
