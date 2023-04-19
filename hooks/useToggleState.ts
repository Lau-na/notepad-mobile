import { useState } from "react";

type UseToggleStateResponse = [boolean, () => void];

export default function useToggleState(initialValue: boolean = false): UseToggleStateResponse {
  const [state, setState] = useState(initialValue);

  const toggle = () => setState((state) => !state);

  return [state, toggle];
}
