"use client";

import { Button, Card, Chip } from "@heroui/react";
import { Badge, badgeVariants } from "@/components/ui/badge";

export function Horizontal() {
    return (
        <Card.Root variant="flat" className="w-full items-stretch md:flex-row hover:scale-105 hover:shadow-lg hover:shadow-black/10 transition-all duration-300">
            <img
                alt="Malibu Beach Duplex thumbnail"
                className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[180px]"
                loading="lazy"
                src="/house.jpg"
            />
            <div className="flex flex-1 flex-col gap-3">
                <Card.Header className="gap-1">
                    <Card.Title>Malibu Beach Detached</Card.Title>
                    <Card.Description className="text-foreground/70">
                        Malibu, CA • Single Family Detached
                    </Card.Description>
                </Card.Header>
                <Card.Content className="text-muted-foreground text-sm grid grid-cols-3 gap-2 align-middle justify-center items-center">
                    <span className="flex items-start">
                        <Badge className="h-10 w-10 text-md bg-emerald-400/20 text-foreground/90">
                            %
                        </Badge>
                        <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                            <p className="text-xs">LTV</p>
                            <p className="text-xs">80%</p>
                        </span>
                    </span>
                    <span className="flex items-start">
                        <Badge className="h-10 w-10 text-md bg-emerald-400/20 text-foreground/90">
                            %
                        </Badge>
                        <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                            <p className="text-xs">APR</p>
                            <p className="text-xs">9.5%</p>
                        </span>
                    </span>
                    <span className="flex items-start">
                        <Badge className="h-10 w-10 text-md bg-emerald-400/20 text-foreground/90">
                            %
                        </Badge>
                        <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                            <p className="text-xs">LTV</p>
                            <p className="text-xs">80%</p>
                        </span>
                    </span>
                </Card.Content>
                <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
                    <div className="flex flex-col items-start justify-start">
                        <span
                        aria-label="Principal loan: 350,000 US dollars"
                        className="text-foreground text-sm font-medium"
                        >
                        Maturity
                        </span>
                        <span className="text-foreground/50 text-xs">
                        01/01/2026
                        </span>
                    </div>
                    <Button variant="secondary">View details</Button>
                </Card.Footer>
            </div>
        </Card.Root>
    );
}