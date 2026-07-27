interface SavingsBadgeProps {
  percent: number;
}

function SavingsBadge({ percent }: SavingsBadgeProps) {
  return (
    <span className="type-badge absolute left-3 top-3 z-10 rounded-full bg-wyze-purple px-2 py-0.5">
      Save {percent}%
    </span>
  );
}

export default SavingsBadge;
