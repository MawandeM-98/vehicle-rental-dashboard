import { Enquiry } from '../../types';

const statusStyles: Record<Enquiry['status'], string> = {
  New: 'bg-green-100 text-green-700',
  Contacted: 'bg-slate-100 text-slate-600',
  'Quotation Sent': 'bg-blue-100 text-blue-700',
};

const avatarPalette = [
  'bg-purple-100 text-purple-700',
  'bg-blue-100 text-blue-700',
  'bg-orange-100 text-orange-700',
  'bg-green-100 text-green-700',
  'bg-pink-100 text-pink-700',
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function RecentEnquiries({ enquiries }: { enquiries: Enquiry[] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-800">Recent Enquiries</h3>
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
      </div>
      <div className="space-y-4 flex-1">
        {enquiries.map((enquiry, i) => (
          <div key={enquiry.id} className="flex items-start gap-3">
            <div
              className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${avatarPalette[i % avatarPalette.length]}`}
            >
              {initials(enquiry.name)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800 truncate">{enquiry.name}</p>
                <span className="text-xs text-slate-400 shrink-0">{enquiry.timeAgo}</span>
              </div>
              <p className="text-xs text-slate-500 truncate mt-0.5">{enquiry.description}</p>
              <span
                className={`inline-block mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${statusStyles[enquiry.status]}`}
              >
                {enquiry.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}