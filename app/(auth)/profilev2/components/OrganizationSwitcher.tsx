"use client";

import { Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UI } from "../constants";
import type { OrganizationSwitcherProps } from "../types";

export function OrganizationSwitcher({
	memberships,
	activeOrganizationId,
	isSwitching,
	onOrganizationChange,
}: OrganizationSwitcherProps) {
	return (
		<Card.Root className="overflow-hidden rounded-2xl border-2 shadow-lg transition-all hover:shadow-xl">
			<Card.Header className={`border-b ${UI.GRADIENTS.cardHeader}`}>
				<div className="flex items-center gap-3">
					<div
						className={`flex h-10 w-10 items-center justify-center rounded-full ${UI.GRADIENTS.primary}`}
					>
						<Icon className="h-5 w-5 text-white" icon="gravity-ui:building" />
					</div>
					<div>
						<Card.Title className="text-xl">Active Organization</Card.Title>
						<Card.Description>Switch between organizations</Card.Description>
					</div>
				</div>
			</Card.Header>
			<Card.Content className="p-6">
				<div className="space-y-4">
					<div>
						<label className="font-semibold text-sm" htmlFor="org-select">
							Select Organization
						</label>
					</div>
					<Select
						disabled={isSwitching}
						onValueChange={onOrganizationChange}
						value={activeOrganizationId}
					>
						<SelectTrigger
							aria-busy={isSwitching}
							className="h-12 w-full rounded-xl border-2 text-base transition-all hover:border-primary"
							disabled={isSwitching}
							id="org-select"
						>
							<SelectValue placeholder="Select organization" />
						</SelectTrigger>
						<SelectContent>
							{memberships.map((membership) => (
								<SelectItem
									key={membership.organizationId}
									value={membership.organizationId}
								>
									<div className="flex items-center gap-2">
										<Icon icon="gravity-ui:building" />
										{membership.organizationName}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{isSwitching && (
						<div className="flex items-center justify-center gap-2 rounded-lg bg-blue-50 p-3 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
							<Icon
								className="h-5 w-5 animate-spin"
								icon="svg-spinners:180-ring"
							/>
							<span className="font-medium">Switching organization...</span>
						</div>
					)}
				</div>
			</Card.Content>
		</Card.Root>
	);
}
