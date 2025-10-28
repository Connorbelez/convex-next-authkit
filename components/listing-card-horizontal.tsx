"use client";

import { Button, Card, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Badge, badgeVariants } from "@/components/ui/badge";
import Link from "next/link";

export interface HorizontalProps {
  id?: string;
  title?: string;
  address?: string;
  imageSrc?: string;
  ltv?: number;
  apr?: number;
  principal?: number;
  propertyType?: string;
  maturityDate?: string;
}

export function Horizontal({
  id,
  title = "Malibu Beach Detached",
  address = "Malibu, CA",
  imageSrc = "/house.jpg",
  ltv = 80,
  apr = 9.5,
  principal = 350000,
  propertyType,
  maturityDate = "01/01/2026",
}: HorizontalProps = {}) {
  const CardContent = (
    <Card.Root
      variant="flat"
      className="w-full items-stretch md:flex-row hover:scale-105 hover:shadow-lg hover:shadow-black/10 transition-all duration-300"
    >
      <img
        alt={`${title} thumbnail`}
        className="rounded-panel pointer-events-none aspect-video sm:aspect-square w-full select-none object-cover sm:max-w-[180px]"
        loading="lazy"
        src={imageSrc}
      />
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title>{title}</Card.Title>
          <Card.Description className="text-foreground/70 flex gap-2 align-middle items-center w-full">
            <Icon icon="lucide:map-pin" className="h-4 w-4" />
            {address}
            {propertyType && ` • ${propertyType}`}
          </Card.Description>
        </Card.Header>
        <Card.Content className="text-muted-foreground text-sm">
          <div className="flex md:grid md:grid-cols-4 84rem:grid-cols-2 md:gap-2 items-center justify-around">
            <span className="flex items-center">
              <Icon icon="lucide:percent-circle" className="h-5 w-5" />
              <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                <p className="text-xs">LTV</p>
                <p className="text-sm font-bold">{ltv}</p>
              </span>
            </span>
            <div className="md:hidden h-8 w-px bg-foreground/30 shrink-0" />
            <span className="flex items-center">
              <Icon icon="lucide:percent-circle" className="h-5 w-5" />
              <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                <p className="text-xs">APR</p>
                <p className="text-sm font-bold">{apr}</p>
              </span>
            </span>
            <div className="md:hidden h-8 w-px bg-foreground/30 shrink-0" />
            <span className="flex items-center">
              <Icon icon="lucide:circle-dollar-sign" className="h-5 w-5" />
              <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                <p className="text-xs">Principal</p>
                <p className="text-sm font-bold">
                  {(principal / 1000).toFixed(0)}K
                </p>
              </span>
            </span>
            <span className="hidden md:flex md:items-center">
              <Icon icon="lucide:circle-dollar-sign" className="h-5 w-5" />
              <span className="flex flex-col ml-2 py-1 justify-around align-middle">
                <p className="text-xs">Market Value</p>
                <p className="text-sm font-bold">
                  {(principal / 1000).toFixed(0)}K
                </p>
              </span>
            </span>
          </div>
        </Card.Content>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label={`Maturity date: ${maturityDate}`}
              className="text-foreground/50 text-sm flex items-center"
            >
              <Icon icon="lucide:calendar" className="h-4 w-4 mr-1" />
              Maturity
            </span>
            <span className="text-foreground/60 font-medium text-sm">
              {maturityDate}
            </span>
          </div>
          <Button className="w-full ml-6" variant="primary">
            View details
          </Button>
        </Card.Footer>
      </div>
    </Card.Root>
  );

  // Wrap in Link if id is provided, otherwise return card directly
  if (id) {
    return (
      <Link href={`/listings/${id}`} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
