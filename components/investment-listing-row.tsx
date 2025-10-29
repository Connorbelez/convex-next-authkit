"use client";

import Image from "next/image";
import { Banknote, Percent, LineChart, MapPin, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercent, formatUsdAbbrev, formatUsdFull } from "@/lib/format";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface InvestmentListingProps {
    id: string;
    title: string;
    city: string;
    region: string;
    principalLoanCents: number; // integer cents
    ltvPercent: number; // 0-100
    interestAprPercent: number; // e.g., 6.5
    imageThumbUrl: string;
    imageAlt?: string;
    badges?: Array<"New" | "Verified" | string>;
    onClick?: () => void;
}

type MetricProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    tooltip?: string;
    className?: string;
};

function MetricPill({ icon, label, value, tooltip, className }: MetricProps) {
    const content = (
        <div
            className={cn(
                "flex flex-col items-start rounded-md border bg-card px-3 py-2 min-w-[88px]",
                className
            )}
        >
            <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] uppercase tracking-wide">
                {icon}
                <span>{label}</span>
            </div>
            <div className="font-semibold text-xl md:text-2xl tabular-nums leading-6">{value}</div>
        </div>
    );

    if (!tooltip) return content;
    return (
        <TooltipProvider delayDuration={150}>
            <Tooltip>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export function InvestmentListingRow(props: InvestmentListingProps) {
    const {
        title,
        city,
        region,
        principalLoanCents,
        ltvPercent,
        interestAprPercent,
        imageThumbUrl,
        imageAlt,
        badges,
        onClick,
    } = props;

    const principalShort = formatUsdAbbrev(principalLoanCents);
    const principalFull = formatUsdFull(principalLoanCents);
    const ltvShort = formatPercent(ltvPercent);
    const interestShort = formatPercent(interestAprPercent, { decimals: interestAprPercent < 10 ? 1 : 0, suffix: "% APR" });

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "group w-full text-left flex items-center gap-4 rounded-xl border bg-background p-4 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label={`${title} in ${city}, ${region}. Principal ${principalFull}. LTV ${ltvPercent} percent. Interest ${interestAprPercent} percent APR.`}
        >
            {/* Thumbnail */}
            <div className="relative h-20 w-20 min-w-20 overflow-hidden rounded-md">
                <Image src={imageThumbUrl || "/placeholder.svg"} alt={imageAlt || title} fill className="object-cover" />
            </div>

            {/* Textual section */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">{city}, {region}</span>
                </div>
                <div className="mt-0.5 line-clamp-1 font-medium text-base md:text-lg">{title}</div>
                {badges && badges.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                        {badges.map((b, i) => (
                            <span key={i} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">{b}</span>
                        ))}
                    </div>
                )}
            </div>

            {/* KPI area */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                <MetricPill
                    icon={<Banknote className="h-3.5 w-3.5" />}
                    label="Principal"
                    value={principalShort}
                    tooltip={`Principal (full): ${principalFull}`}
                />
                <MetricPill
                    icon={<Percent className="h-3.5 w-3.5" />}
                    label="LTV"
                    value={ltvShort}
                    tooltip={`Loan-to-value ratio: ${ltvPercent}%`}
                />
                <MetricPill
                    icon={<LineChart className="h-3.5 w-3.5" />}
                    label="Interest"
                    value={interestShort}
                    tooltip={`Annual percentage rate (APR): ${interestAprPercent}%`}
                />
            </div>

            {/* Affordance */}
            <ChevronRight className="ml-1 h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />

            {/* Screen-reader full values to complement abbreviations */}
            <span className="sr-only">Principal full value {principalFull}</span>
        </button>
    );
}

export default InvestmentListingRow;
