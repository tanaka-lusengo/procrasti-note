// Placeholder component for ConnectionsSection
export const ConnectionsSection = ({
  connections,
}: {
  connections: string[];
}) => {
  return (
    <div>
      {connections.map((friend, index) => (
        <div key={index}>Friend: {friend}</div>
      ))}
    </div>
  );
};
