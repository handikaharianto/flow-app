import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import TradeDataTable from "@/components/trade-table/trade-data-table";
import { SectionCards } from "@/components/section-cards";

import { getTradePlans } from "@/lib/actions/trade.actions";

export default async function Page() {
  const tradePlans = await getTradePlans();

  return (
    <>
      <SectionCards />
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
      <TradeDataTable data={tradePlans} />
    </>
  );
}
