"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ListingMap, type ListingMapProps, type ViewportBounds } from "@/components/ListingMap";
import type { WithLatLng } from "@/hooks/use-filtered-listings";
import { useIsMobile } from "@/hooks/use-mobile";
import { useViewportFilteredItems } from "@/hooks/use-filtered-listings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ClassNames = {
  container?: string;
  gridColumn?: string;
  mapColumn?: string;
  mapWrapper?: string;
};

export type ListingGridShellProps<T extends WithLatLng> = {
  items: ReadonlyArray<T>;
  renderCard: (item: T) => React.ReactNode;
  renderMapPopup: ListingMapProps<T>["renderPopup"];
  classNames?: ClassNames;
  mapProps?: Partial<Omit<ListingMapProps<T>, "items" | "renderPopup" | "onViewportChange">>;
};

export function ListingGridShell<T extends WithLatLng>({
  items,
  renderCard,
  renderMapPopup,
  classNames,
  mapProps,
}: ListingGridShellProps<T>) {
  const isMobile = useIsMobile();
  const [viewportBounds, setViewportBounds] = React.useState<ViewportBounds | undefined>(undefined);

  const filteredItems = useViewportFilteredItems(items, viewportBounds);

  const onViewportChange = React.useCallback((bounds: ViewportBounds) => {
    setViewportBounds(bounds);
  }, []);

  if (isMobile) {
    return (
      <div className={classNames?.container}>
        <Tabs defaultValue="list" className="flex flex-col gap-2">
          <TabsList className="flex w-full justify-end">
            <TabsTrigger value="list">Listings</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <TabsContent value="list" className={classNames?.gridColumn}>
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={(item as { id?: string | number }).id ?? JSON.stringify(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    layout
                  >
                    {renderCard(item)}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </TabsContent>
          <TabsContent value="map" className={classNames?.mapColumn}>
            <ListingMap
              items={filteredItems}
              renderPopup={renderMapPopup}
              onViewportChange={onViewportChange}
              className={classNames?.mapWrapper}
              style={{ height: "60vh" }}
              {...mapProps}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <section className={classNames?.container ?? "flex gap-6"}>
      <div className={classNames?.gridColumn ?? "flex-1"}>
        <div className="grid gap-2">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={(item as { id?: string | number }).id ?? JSON.stringify(item)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                layout
              >
                {renderCard(item)}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className={classNames?.mapColumn ?? "w-[40%]"}>
        <div className={classNames?.mapWrapper ?? "sticky top-24 h-[calc(100vh-7rem)]"}>
          <ListingMap
            items={filteredItems}
            renderPopup={renderMapPopup}
            onViewportChange={onViewportChange}
            className="h-full"
            {...mapProps}
          />
        </div>
      </div>
    </section>
  );
}

ListingGridShell.displayName = "ListingGridShell";


