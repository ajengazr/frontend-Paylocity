import { iconMap } from './iconMap';

const PayrollSummary = ({ data }) => {
    return (
        <div className="p-8 rounded-2xl bg-[#111827] text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ff6b00_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
            <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#ff6b00] rounded-md">
                        <iconMap.Wallet className="w-4 h-4 text-white" />
                    </span>
                    <h3 className="text-base font-semibold text-gray-100">Rincian Gaji</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-left">
                    {data.items.map((item, i) => (
                        <div key={i}>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{item.label}</p>
                            <p className="text-lg font-bold mt-1 text-white">{item.value}</p>
                            <div className={`h-1 w-12 mt-1.5 rounded-full ${item.color}`}></div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 my-4"></div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <iconMap.Info className="w-4 h-4 text-gray-500" />
                        <span>{data.footerNote}</span>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Grand Total</p>
                        <p className="text-3xl font-extrabold text-[#ff6b00] mt-1">{data.grandTotal}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayrollSummary;