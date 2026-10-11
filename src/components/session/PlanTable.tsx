const ROW_STAGGER = 120;

type PlanTableProps = {
  rows: [string, string, string][];
  visibleRows: number;
};

export default function PlanTable({ rows, visibleRows }: PlanTableProps) {
  return (
    <div className="overflow-hidden rounded-md border border-grey-35">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-grey-20">
            {['Steps', 'Tools', 'Why'].map((heading) => <th key={heading} className="border-b border-grey-35 px-2 py-1.5 text-small font-medium text-grey-80">{heading}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map(([step, tool, why], index) => (
            <tr key={step} style={{ transitionDelay: `${index * ROW_STAGGER}ms` }} className={`transition duration-300 ${index < visibleRows ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
              <td className="w-[32%] border-b border-r border-grey-35 px-2 py-1.5 text-small text-grey-80">{step}</td>
              <td className="w-[18%] border-b border-r border-grey-35 px-2 py-1.5 text-small text-grey-80">{tool}</td>
              <td className="border-b border-grey-35 px-2 py-1.5 text-small text-grey-80">{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
