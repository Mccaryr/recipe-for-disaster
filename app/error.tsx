"use client";
export const Error = ({ error }: { error: Error }) => {
  return (
    <main className="error">
      <h2>An error has occurred</h2>
      <p>{error.message}</p>
    </main>
  );
};

export default Error;
