"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Icon } from "@iconify/react";

interface PropertyMapProps {
	location: {
		lat: number;
		lng: number;
	};
	address: {
		street: string;
		city: string;
		state: string;
	};
}

export function PropertyMap({ location, address }: PropertyMapProps) {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map | null>(null);
	const [mapError, setMapError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Get Mapbox token from environment
		const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

		if (!mapboxToken) {
			setMapError("Mapbox token not configured");
			setIsLoading(false);
			return;
		}

		if (!mapContainer.current) return;
		if (map.current) return; // Initialize map only once

		mapboxgl.accessToken = mapboxToken;

		try {
			// Initialize map
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v12",
				center: [location.lng, location.lat],
				zoom: 14,
				// Disable interactions for simpler static-like display
				interactive: true,
				attributionControl: true,
			});

			// Add navigation controls
			map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

			// Add marker at property location
			const marker = new mapboxgl.Marker({ color: "#ef4444" })
				.setLngLat([location.lng, location.lat])
				.setPopup(
					new mapboxgl.Popup({ offset: 25 }).setHTML(
						`<div class="p-2">
							<p class="font-semibold">${address.street}</p>
							<p class="text-sm text-gray-600">${address.city}, ${address.state}</p>
						</div>`
					)
				)
				.addTo(map.current);

			// Show popup on load
			marker.togglePopup();

			map.current.on("load", () => {
				setIsLoading(false);
			});

			map.current.on("error", (e) => {
				console.error("Mapbox error:", e);
				setMapError("Failed to load map");
				setIsLoading(false);
			});

			// Set timeout for slow loading
			const timeout = setTimeout(() => {
				if (isLoading) {
					setMapError("Map loading timeout");
					setIsLoading(false);
				}
			}, 10000);

			return () => {
				clearTimeout(timeout);
				map.current?.remove();
				map.current = null;
			};
		} catch (error) {
			console.error("Map initialization error:", error);
			setMapError("Failed to initialize map");
			setIsLoading(false);
		}
	}, [location.lat, location.lng, address.street, address.city, address.state]);

	if (mapError) {
		return (
			<div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-gray-100 lg:aspect-auto lg:h-full dark:bg-gray-800">
				<div className="flex h-full flex-col items-center justify-center p-6 text-center">
					<Icon className="h-12 w-12 text-gray-400" icon="lucide:map-pin-off" />
					<p className="mt-3 font-medium text-gray-700 dark:text-gray-300">
						Map Unavailable
					</p>
					<p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
						{mapError}
					</p>
					<p className="mt-4 text-gray-600 text-sm dark:text-gray-400">
						{address.street}
						<br />
						{address.city}, {address.state}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="relative aspect-4/3 w-full overflow-hidden rounded-lg lg:aspect-auto lg:h-full">
			{isLoading && (
				<div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
					<div className="flex flex-col items-center">
						<Icon
							className="h-8 w-8 animate-spin text-primary"
							icon="lucide:loader-2"
						/>
						<p className="mt-2 text-gray-600 text-sm dark:text-gray-400">
							Loading map...
						</p>
					</div>
				</div>
			)}
			<div className="h-full w-full" ref={mapContainer} />
		</div>
	);
}
