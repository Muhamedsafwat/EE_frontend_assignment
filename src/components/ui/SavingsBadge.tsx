interface SavingsBadgeProps {
  percent: number;
}

function SavingsBadge({ percent }: SavingsBadgeProps) {
  return (
    <span className="absolute left-3 top-3 z-10 rounded-md bg-violet-600 px-2 py-0.5 text-xs font-semibold text-white">
      Save {percent}%
    </span>
  );
}

export default SavingsBadge;
