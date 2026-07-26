/** Decorative satisfaction-guarantee seal. */
function GuaranteeSeal({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <img
      src="/assets/badges/satisfaction_badge.png"
      alt="100% Satisfaction Guarantee"
      className={className}
    />
  );
}

export default GuaranteeSeal;
