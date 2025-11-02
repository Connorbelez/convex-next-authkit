"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

interface ImageCarouselProps {
	images: Array<{
		url: string;
		alt?: string;
		order: number;
	}>;
	propertyTitle: string;
}

export function ImageCarousel({ images, propertyTitle }: ImageCarouselProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi, onSelect]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === "ArrowRight") {
				event.preventDefault();
				scrollNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [scrollPrev, scrollNext]);

	// Sort images by order
	const sortedImages = [...images].sort((a, b) => a.order - b.order);

	// Handle single image case
	if (sortedImages.length === 0) {
		return (
			<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
				<div className="flex h-full items-center justify-center">
					<Icon icon="lucide:image-off" className="h-16 w-16 text-gray-400" />
					<p className="ml-3 text-gray-500">No images available</p>
				</div>
			</div>
		);
	}

	const showNavigation = sortedImages.length > 1;

	return (
		<div
			className="relative w-full"
			role="region"
			aria-label="Property image carousel"
		>
			{/* Main carousel */}
			<div className="overflow-hidden rounded-lg" ref={emblaRef}>
				<div className="flex touch-pan-y">
					{sortedImages.map((image, index) => (
						<div key={index} className="relative min-w-0 flex-[0_0_100%]">
							<div className="relative aspect-[4/3] w-full">
								<Image
									src={image.url}
									alt={image.alt || `${propertyTitle} - Image ${index + 1}`}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
									priority={index === 0}
									quality={index === 0 ? 90 : 75}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Navigation arrows */}
			{showNavigation && (
				<>
					<Button
						isIconOnly
						className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
						onClick={scrollPrev}
						aria-label="Previous image"
					>
						<Icon icon="lucide:chevron-left" className="h-6 w-6" />
					</Button>
					<Button
						isIconOnly
						className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/90 shadow-lg hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
						onClick={scrollNext}
						aria-label="Next image"
					>
						<Icon icon="lucide:chevron-right" className="h-6 w-6" />
					</Button>
				</>
			)}

			{/* Image counter */}
			{showNavigation && (
				<div className="absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
					{selectedIndex + 1} / {sortedImages.length}
				</div>
			)}

			{/* Thumbnail navigation */}
			{showNavigation && (
				<div className="mt-4 flex gap-2 overflow-x-auto pb-2">
					{sortedImages.map((image, index) => (
						<button
							key={index}
							type="button"
							onClick={() => scrollTo(index)}
							className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md transition-all ${
								index === selectedIndex
									? "ring-2 ring-primary ring-offset-2"
									: "opacity-60 hover:opacity-100"
							}`}
							aria-label={`View image ${index + 1}`}
							aria-current={index === selectedIndex}
						>
							<Image
								src={image.url}
								alt={image.alt || `Thumbnail ${index + 1}`}
								fill
								className="object-cover"
								sizes="80px"
							/>
						</button>
					))}
				</div>
			)}

			{/* Screen reader announcements */}
			<div
				className="sr-only"
				role="status"
				aria-live="polite"
				aria-atomic="true"
			>
				Viewing image {selectedIndex + 1} of {sortedImages.length}
			</div>
		</div>
	);
}
