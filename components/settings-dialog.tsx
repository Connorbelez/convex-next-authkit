"use client";

import * as React from "react";
import {
	Bell,
	Briefcase,
	Check,
	CheckSquare,
	ClipboardList,
	Globe,
	Keyboard,
	LinkIcon,
	Lock,
	MessageCircle,
	Settings,
	Video,
	ImageIcon,
	FileText,
	X,
	PanelLeft,
} from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
	DrawerTrigger,
	DrawerClose,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const sampleMessages = [
	{
		id: 1,
		sender: "John Doe",
		message: "Hey, how are you?",
		time: "10:30 AM",
		avatar: "JD",
	},
	{
		id: 2,
		sender: "Jane Smith",
		message: "Meeting at 3 PM today",
		time: "11:45 AM",
		avatar: "JS",
	},
	{
		id: 3,
		sender: "Mike Johnson",
		message: "Can you review the document?",
		time: "Yesterday",
		avatar: "MJ",
	},
	{
		id: 4,
		sender: "Sarah Williams",
		message: "Thanks for your help!",
		time: "Yesterday",
		avatar: "SW",
	},
	{
		id: 5,
		sender: "Tom Brown",
		message: "Project update attached",
		time: "2 days ago",
		avatar: "TB",
	},
];

const sampleMedia = [
	{
		id: 1,
		type: "image",
		name: "Screenshot 2024.png",
		size: "2.4 MB",
		date: "Today",
	},
	{
		id: 2,
		type: "image",
		name: "Photo_001.jpg",
		size: "1.8 MB",
		date: "Yesterday",
	},
	{
		id: 3,
		type: "video",
		name: "Meeting_Recording.mp4",
		size: "45.2 MB",
		date: "Yesterday",
	},
	{
		id: 4,
		type: "image",
		name: "Design_Mockup.png",
		size: "3.1 MB",
		date: "2 days ago",
	},
	{
		id: 5,
		type: "image",
		name: "Profile_Picture.jpg",
		size: "890 KB",
		date: "3 days ago",
	},
];

const sampleLinks = [
	{
		id: 1,
		url: "https://github.com/project",
		title: "GitHub Repository",
		date: "Today",
	},
	{
		id: 2,
		url: "https://docs.example.com",
		title: "Documentation",
		date: "Yesterday",
	},
	{
		id: 3,
		url: "https://figma.com/design",
		title: "Figma Design File",
		date: "2 days ago",
	},
	{
		id: 4,
		url: "https://notion.so/notes",
		title: "Meeting Notes",
		date: "3 days ago",
	},
];

const sampleFiles = [
	{ id: 1, name: "Project_Proposal.pdf", size: "1.2 MB", date: "Today" },
	{ id: 2, name: "Budget_2024.xlsx", size: "456 KB", date: "Yesterday" },
	{ id: 3, name: "Presentation.pptx", size: "8.9 MB", date: "2 days ago" },
	{ id: 4, name: "Contract_Draft.docx", size: "234 KB", date: "3 days ago" },
];

const sections = [
	{
		id: "notifications",
		name: "Notifications",
		icon: Bell,
		notificationCount: 5,
	},
	{ id: "deals", name: "Deals", icon: Briefcase },
	{ id: "tasks", name: "Tasks", icon: CheckSquare, notificationCount: 3 },
	{ id: "deal-requests", name: "Deal Requests", icon: ClipboardList },
	{
		id: "messages",
		name: "Messages & media",
		icon: MessageCircle,
		hasSubTabs: true,
	},
	{ id: "language", name: "Language & region", icon: Globe },
	{ id: "accessibility", name: "Accessibility", icon: Keyboard },
	{ id: "mark-read", name: "Mark as read", icon: Check },
	{ id: "audio-video", name: "Audio & video", icon: Video },
	{ id: "connected", name: "Connected accounts", icon: LinkIcon },
	{ id: "privacy", name: "Privacy & visibility", icon: Lock },
	{ id: "advanced", name: "Advanced", icon: Settings },
];

const messageSubTabs = [
	{ id: "messages-list", name: "Messages", icon: MessageCircle },
	{ id: "media", name: "Media", icon: ImageIcon },
	{ id: "links", name: "Links", icon: LinkIcon },
	{ id: "files", name: "Files", icon: FileText },
];

function MessagesContent() {
	return (
		<div className="space-y-3">
			{sampleMessages.map((msg) => (
				<div key={msg.id} className="flex gap-3 rounded-lg border bg-card p-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
						{msg.avatar}
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center justify-between gap-2">
							<p className="font-medium text-sm">{msg.sender}</p>
							<span className="text-xs text-muted-foreground">{msg.time}</span>
						</div>
						<p className="text-sm text-muted-foreground truncate">
							{msg.message}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}

function MediaContent() {
	return (
		<div className="grid grid-cols-2 gap-3">
			{sampleMedia.map((item) => (
				<div key={item.id} className="rounded-lg border bg-card p-3 space-y-2">
					<div className="aspect-video bg-muted rounded-md flex items-center justify-center">
						{item.type === "image" ? (
							<ImageIcon className="h-8 w-8 text-muted-foreground" />
						) : (
							<Video className="h-8 w-8 text-muted-foreground" />
						)}
					</div>
					<div>
						<p className="text-sm font-medium truncate">{item.name}</p>
						<div className="flex items-center justify-between text-xs text-muted-foreground">
							<span>{item.size}</span>
							<span>{item.date}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function LinksContent() {
	return (
		<div className="space-y-3">
			{sampleLinks.map((link) => (
				<div key={link.id} className="flex gap-3 rounded-lg border bg-card p-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
						<LinkIcon className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm truncate">{link.title}</p>
						<p className="text-xs text-muted-foreground truncate">{link.url}</p>
						<span className="text-xs text-muted-foreground">{link.date}</span>
					</div>
				</div>
			))}
		</div>
	);
}

function FilesContent() {
	return (
		<div className="space-y-3">
			{sampleFiles.map((file) => (
				<div key={file.id} className="flex gap-3 rounded-lg border bg-card p-3">
					<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
						<FileText className="h-5 w-5 text-muted-foreground" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="font-medium text-sm truncate">{file.name}</p>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span>{file.size}</span>
							<span>•</span>
							<span>{file.date}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export function SettingsDialog() {
	const [open, setOpen] = React.useState(true);
	const [activeSection, setActiveSection] = React.useState("messages");
	const [activeSubTab, setActiveSubTab] = React.useState("messages-list");
	const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
	const isMobile = useIsMobile();

	const renderContent = () => {
		if (activeSection === "messages") {
			switch (activeSubTab) {
				case "messages-list":
					return <MessagesContent />;
				case "media":
					return <MediaContent />;
				case "links":
					return <LinksContent />;
				case "files":
					return <FilesContent />;
				default:
					return <MessagesContent />;
			}
		}

		const section = sections.find((s) => s.id === activeSection);
		return (
			<div className="flex items-center justify-center h-full text-muted-foreground">
				<p>Content for {section?.name} coming soon...</p>
			</div>
		);
	};

	const getCurrentSectionName = () => {
		return sections.find((s) => s.id === activeSection)?.name || "Settings";
	};

	if (isMobile) {
		return (
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button size="sm">Open Settings</Button>
				</DrawerTrigger>
				<DrawerContent className="h-[85vh] flex flex-col z-200">
					<DrawerHeader className="border-b">
						<div className="flex items-center justify-between">
							<DrawerTitle>{getCurrentSectionName()}</DrawerTitle>
							<DrawerClose asChild>
								<Button variant="ghost" size="icon" className="h-8 w-8">
									<X className="h-4 w-4" />
								</Button>
							</DrawerClose>
						</div>
						<DrawerDescription className="sr-only">
							View and manage your settings
						</DrawerDescription>
						{activeSection === "messages" && (
							<div className="flex gap-2 overflow-x-auto pt-3 scrollbar-hide">
								{messageSubTabs.map((tab) => (
									<button
										key={tab.id}
										onClick={() => setActiveSubTab(tab.id)}
										className={cn(
											"flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap",
											activeSubTab === tab.id
												? "bg-secondary text-secondary-foreground"
												: "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
										)}
									>
										<tab.icon className="h-4 w-4" />
										<span>{tab.name}</span>
									</button>
								))}
							</div>
						)}
					</DrawerHeader>
					<div className="flex-1 overflow-y-auto p-4">{renderContent()}</div>
					<div className="border-t bg-background">
						<div className="flex gap-2 overflow-x-auto p-3 scrollbar-hide">
							{sections.map((section) => (
								<button
									key={section.id}
									onClick={() => {
										setActiveSection(section.id);
										if (section.hasSubTabs) {
											setActiveSubTab("messages-list");
										}
									}}
									className={cn(
										"flex flex-col items-center justify-center gap-1.5 rounded-lg px-6 py-3 text-xs font-medium transition-colors whitespace-nowrap min-w-[80px] shrink-0 relative",
										activeSection === section.id
											? "bg-primary text-primary-foreground"
											: "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
									)}
								>
									<div className="relative">
										<section.icon className="h-5 w-5" />
										{section.notificationCount &&
											section.notificationCount > 0 && (
												<Badge
													variant="destructive"
													className="absolute -top-2 -right-2 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
												>
													{section.notificationCount}
												</Badge>
											)}
									</div>
									<span className="text-center leading-tight">
										{section.name}
									</span>
								</button>
							))}
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">Open Dialog</Button>
			</DialogTrigger>
			<DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[900px] lg:max-w-[1000px] z-200">
				<DialogTitle className="sr-only">Settings</DialogTitle>
				<DialogDescription className="sr-only">
					Customize your settings here.
				</DialogDescription>
				<div className="flex h-[480px]">
					{/* Custom Sidebar */}
					<aside
						className={cn(
							"hidden sm:flex flex-col border-r bg-muted/40 transition-all duration-300",
							sidebarCollapsed ? "w-16" : "sm:w-40 lg:w-64",
						)}
					>
						<nav className="flex-1 overflow-y-auto p-2">
							{sections.map((section) => (
								<button
									key={section.id}
									onClick={() => {
										setActiveSection(section.id);
										if (section.hasSubTabs) {
											setActiveSubTab("messages-list");
										}
									}}
									className={cn(
										"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors mb-1 relative",
										activeSection === section.id
											? "bg-primary text-primary-foreground"
											: "text-muted-foreground hover:bg-muted hover:text-foreground",
										sidebarCollapsed && "justify-center px-2",
									)}
									title={sidebarCollapsed ? section.name : undefined}
								>
									<div className="relative">
										<section.icon className="h-5 w-5 shrink-0" />
										{section.notificationCount &&
											section.notificationCount > 0 && (
												<Badge
													variant="destructive"
													className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center"
												>
													{section.notificationCount}
												</Badge>
											)}
									</div>
									{!sidebarCollapsed && (
										<span className="truncate flex-1">{section.name}</span>
									)}
									{!sidebarCollapsed &&
										section.notificationCount &&
										section.notificationCount > 0 && (
											<Badge
												variant="destructive"
												className="h-5 min-w-5 px-1.5 text-xs flex items-center justify-center ml-auto"
											>
												{section.notificationCount}
											</Badge>
										)}
								</button>
							))}
						</nav>
					</aside>

					{/* Main Content */}
					<main className="flex flex-1 flex-col overflow-hidden">
						<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
							{/* Custom Toggle Button */}
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 hidden sm:flex"
								onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
							>
								<PanelLeft className="h-4 w-4" />
							</Button>
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem className="hidden md:block">
										<BreadcrumbLink href="#">Settings</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator className="hidden md:block" />
									<BreadcrumbItem>
										<BreadcrumbPage>{getCurrentSectionName()}</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</header>
						<div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
							{activeSection === "messages" && (
								<div className="flex gap-2 border-b pb-3 mb-1">
									{messageSubTabs.map((tab) => (
										<button
											key={tab.id}
											onClick={() => setActiveSubTab(tab.id)}
											className={cn(
												"flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
												activeSubTab === tab.id
													? "bg-secondary text-secondary-foreground"
													: "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
											)}
										>
											<tab.icon className="h-4 w-4" />
											<span>{tab.name}</span>
										</button>
									))}
								</div>
							)}
							{renderContent()}
						</div>
					</main>
				</div>
			</DialogContent>
		</Dialog>
	);
}
