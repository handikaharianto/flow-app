import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import TradeDataTable from "@/components/trade-table/trade-data-table";
import { SectionCards } from "@/components/section-cards";
import { getTradePlans } from "@/lib/actions/trade.actions";

export default async function Page() {
  const tradePlans = await getTradePlans();

  return (
    <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <TradeDataTable data={tradePlans} />
    </div>
  );
}
