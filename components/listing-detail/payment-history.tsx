"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format, parseISO } from "date-fns";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface Payment {
	_id: string;
	_creationTime: number;
	listingId: string;
	amount: number;
	date: string;
	status: "paid" | "pending" | "late";
	type: "principal" | "interest" | "escrow";
}

interface PaymentHistoryProps {
	payments: Payment[];
	itemsPerPage?: number;
}

const statusConfig: Record<
	Payment["status"],
	{ label: string; color: "success" | "warning" | "danger"; icon: string }
> = {
	paid: {
		label: "Paid",
		color: "success",
		icon: "lucide:circle-check",
	},
	pending: {
		label: "Pending",
		color: "warning",
		icon: "lucide:clock",
	},
	late: {
		label: "Late",
		color: "danger",
		icon: "lucide:alert-circle",
	},
};

const typeConfig: Record<
	Payment["type"],
	{ label: string; icon: string; color: string }
> = {
	principal: {
		label: "Principal",
		icon: "lucide:home",
		color: "text-blue-600",
	},
	interest: {
		label: "Interest",
		icon: "lucide:percent",
		color: "text-purple-600",
	},
	escrow: {
		label: "Escrow",
		icon: "lucide:shield",
		color: "text-green-600",
	},
};

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(amount);
}

export function PaymentHistory({
	payments,
	itemsPerPage = 5,
}: PaymentHistoryProps) {
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate pagination
	const totalPages = Math.ceil(payments.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Get current page items
	const currentPayments = useMemo(
		() => payments.slice(startIndex, endIndex),
		[payments, startIndex, endIndex],
	);

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const pages: (number | "ellipsis")[] = [];

		if (totalPages <= 7) {
			// Show all pages if 7 or fewer
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// Always show first page
			pages.push(1);

			if (currentPage > 3) {
				pages.push("ellipsis");
			}

			// Show pages around current page
			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (currentPage < totalPages - 2) {
				pages.push("ellipsis");
			}

			// Always show last page
			pages.push(totalPages);
		}

		return pages;
	};

	if (payments.length === 0) {
		return (
			<div className="space-y-4">
				<div className="flex items-center gap-2">
					<Icon icon="lucide:receipt" className="h-6 w-6 text-primary" />
					<h2 className="text-2xl font-bold">Payment History</h2>
				</div>
				<Card.Root>
					<CardContent className="py-12 text-center">
						<Icon
							icon="lucide:inbox"
							className="mx-auto h-12 w-12 text-gray-400"
						/>
						<p className="mt-3 font-medium text-gray-700 dark:text-gray-300">
							No Payment History
						</p>
						<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
							Payments will appear here after the first payment is made.
						</p>
					</CardContent>
				</Card.Root>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2">
				<Icon icon="lucide:receipt" className="h-6 w-6 text-primary" />
				<h2 className="text-2xl font-bold">Payment History</h2>
				<Chip>{payments.length} payments</Chip>
			</div>

			<div className="space-y-3">
				{currentPayments.map((payment, index) => {
					const statusInfo = statusConfig[payment.status];
					const typeInfo = typeConfig[payment.type];
					const paymentDate = parseISO(payment.date);

					return (
						<Card.Root key={payment._id}>
							<CardContent className="p-4">
								<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
									{/* Left side: Date and Type */}
									<div className="flex items-start gap-3">
										{/* Timeline dot */}
										<div className="relative">
											<div
												className={`rounded-full p-1.5 ${statusInfo.color === "success" ? "bg-green-100 dark:bg-green-900/30" : statusInfo.color === "warning" ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
											>
												<Icon
													icon={statusInfo.icon}
													className={`h-4 w-4 ${statusInfo.color === "success" ? "text-green-600" : statusInfo.color === "warning" ? "text-yellow-600" : "text-red-600"}`}
												/>
											</div>
											{/* Vertical line (except for last item on page) */}
											{index < currentPayments.length - 1 && (
												<div className="absolute left-1/2 top-full h-3 w-px -translate-x-1/2 bg-gray-200 dark:bg-gray-700" />
											)}
										</div>

										<div className="flex-1">
											<div className="flex items-center gap-2">
												<p className="font-semibold text-gray-900 dark:text-white">
													{format(paymentDate, "MMMM d, yyyy")}
												</p>
												<Chip color={statusInfo.color}>{statusInfo.label}</Chip>
											</div>
											<div className="mt-1 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
												<Icon
													icon={typeInfo.icon}
													className={`h-4 w-4 ${typeInfo.color}`}
												/>
												<span>{typeInfo.label}</span>
											</div>
										</div>
									</div>

									{/* Right side: Amount */}
									<div className="text-right sm:text-left">
										<p className="text-2xl font-bold text-gray-900 dark:text-white">
											{formatCurrency(payment.amount)}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-500">
											{format(paymentDate, "h:mm a")}
										</p>
									</div>
								</div>
							</CardContent>
						</Card.Root>
					);
				})}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-6 flex justify-center">
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious
									href="#"
									onClick={(e) => {
										e.preventDefault();
										if (currentPage > 1) {
											setCurrentPage(currentPage - 1);
										}
									}}
									className={
										currentPage === 1
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
								/>
							</PaginationItem>

							{getPageNumbers().map((page, idx) => (
								<PaginationItem key={`${page}-${idx}`}>
									{page === "ellipsis" ? (
										<PaginationEllipsis />
									) : (
										<PaginationLink
											href="#"
											onClick={(e) => {
												e.preventDefault();
												setCurrentPage(page);
											}}
											isActive={currentPage === page}
											className="cursor-pointer"
										>
											{page}
										</PaginationLink>
									)}
								</PaginationItem>
							))}

							<PaginationItem>
								<PaginationNext
									href="#"
									onClick={(e) => {
										e.preventDefault();
										if (currentPage < totalPages) {
											setCurrentPage(currentPage + 1);
										}
									}}
									className={
										currentPage === totalPages
											? "pointer-events-none opacity-50"
											: "cursor-pointer"
									}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</div>
			)}
		</div>
	);
}
