export const CodeBlock = ({ children }) => (
  <pre className="max-h-[540px] overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-100">
    <code>{children}</code>
  </pre>
);

