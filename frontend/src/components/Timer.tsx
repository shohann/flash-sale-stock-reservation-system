import useCountdown from "../hooks/useCountdown";

interface Props {
  expiresAt: string;
}

export default function Timer({ expiresAt }: Props) {
  const { seconds, isExpired } = useCountdown(expiresAt);

  if (isExpired) return null; // ⬅ remove timer from UI

  return <div>Expires in: {seconds}s</div>;
}
