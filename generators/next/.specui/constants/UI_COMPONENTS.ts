import AccordionTemplate from '../templates/components/AccordionTemplate';
import AlertDialogTemplate from '../templates/components/AlertDialogTemplate';
import AlertTemplate from '../templates/components/AlertTemplate';
import AspectRatioTemplate from '../templates/components/AspectRatioTemplate';
import AvatarTemplate from '../templates/components/AvatarTemplate';
import BadgeTemplate from '../templates/components/BadgeTemplate';
import BreadcrumbTemplate from '../templates/components/BreadcrumbTemplate';
import ButtonTemplate from '../templates/components/ButtonTemplate';
import CalendarTemplate from '../templates/components/CalendarTemplate';
import CardTemplate from '../templates/components/CardTemplate';
import CarouselTemplate from '../templates/components/CarouselTemplate';
import CheckboxTemplate from '../templates/components/CheckboxTemplate';
import CollapsableTemplate from '../templates/components/CollapsableTemplate';
import CommandTemplate from '../templates/components/CommandTemplate';
import ContextMenuTemplate from '../templates/components/ContextMenuTemplate';
import DialogTemplate from '../templates/components/DialogTemplate';
import DrawerTemplate from '../templates/components/DrawerTemplate';
import DropdownTemplate from '../templates/components/DropdownTemplate';
import InputTemplate from '../templates/components/InputTemplate';
import SeparatorTemplate from '../templates/components/SeparatorTemplate';
import SheetTemplate from '../templates/components/SheetTemplate';
import SidebarTemplate from '../templates/components/SidebarTemplate';
import SkeletonTemplate from '../templates/components/SkeletonTemplate';
import TooltipTemplate from '../templates/components/TooltipTemplate';
import TypingEffectTemplate from '../templates/components/TypingEffectTemplate';

export const UI_COMPONENTS: Record<
  string,
  {
    components: string[];
    dependencies?: string[];
    template: string;
  }
> = {
  accordion: {
    components: ['Accordion', 'AccordionItem', 'AccordionTrigger', 'AccordionContent'],
    dependencies: ['@radix-ui/react-accordion', '@radix-ui/react-icons'],
    template: AccordionTemplate,
  },
  alert: {
    components: ['Alert', 'AlertTitle', 'AlertDescription'],
    dependencies: ['class-variance-authority'],
    template: AlertTemplate,
  },
  alertDialog: {
    components: [
      'AlertDialog',
      'AlertDialogPortal',
      'AlertDialogOverlay',
      'AlertDialogTrigger',
      'AlertDialogContent',
      'AlertDialogHeader',
      'AlertDialogFooter',
      'AlertDialogTitle',
      'AlertDialogDescription',
      'AlertDialogAction',
      'AlertDialogCancel',
    ],
    dependencies: ['@radix-ui/react-alert-dialog'],
    template: AlertDialogTemplate,
  },
  aspectRatio: {
    components: ['AspectRatio'],
    dependencies: ['@radix-ui/react-aspect-ratio'],
    template: AspectRatioTemplate,
  },
  avatar: {
    components: ['Avatar', 'AvatarImage', 'AvatarFallback'],
    dependencies: ['@radix-ui/react-avatar'],
    template: AvatarTemplate,
  },
  badge: {
    components: ['Badge'],
    dependencies: ['class-variance-authority'],
    template: BadgeTemplate,
  },
  breadcrumb: {
    components: [
      'Breadcrumb',
      'BreadcrumbList',
      'BreadcrumbItem',
      'BreadcrumbLink',
      'BreadcrumbPage',
      'BreadcrumbSeparator',
      'BreadcrumbEllipsis',
    ],
    dependencies: ['@radix-ui/react-icons', '@radix-ui/react-slot'],
    template: BreadcrumbTemplate,
  },
  button: {
    components: ['Button'],
    dependencies: ['@radix-ui/react-slot', 'class-variance-authority'],
    template: ButtonTemplate,
  },
  calendar: {
    components: ['Calendar'],
    dependencies: ['@radix-ui/react-icons', 'react-day-picker'],
    template: CalendarTemplate,
  },
  card: {
    components: ['Card', 'CardHeader', 'CardFooter', 'CardTitle', 'CardDescription', 'CardContent'],
    template: CardTemplate,
  },
  carousel: {
    components: ['Carousel', 'CarouselContent', 'CarouselItem', 'CarouselPrevious', 'CarouselNext'],
    dependencies: ['@radix-ui/react-icons', 'embla-carousel-react'],
    template: CarouselTemplate,
  },
  checkbox: {
    components: ['Checkbox'],
    dependencies: ['@radix-ui/react-checkbox', '@radix-ui/react-icons'],
    template: CheckboxTemplate,
  },
  collapsable: {
    components: ['Collapsible', 'CollapsibleTrigger', 'CollapsibleContent'],
    dependencies: ['@radix-ui/react-collapsible'],
    template: CollapsableTemplate,
  },
  command: {
    components: [
      'Command',
      'CommandDialog',
      'CommandInput',
      'CommandList',
      'CommandEmpty',
      'CommandGroup',
      'CommandItem',
      'CommandShortcut',
      'CommandSeparator',
    ],
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons', 'cmdk'],
    template: CommandTemplate,
  },
  contextMenu: {
    components: [
      'ContextMenu',
      'ContextMenuTrigger',
      'ContextMenuContent',
      'ContextMenuItem',
      'ContextMenuCheckboxItem',
      'ContextMenuRadioItem',
      'ContextMenuLabel',
      'ContextMenuSeparator',
      'ContextMenuShortcut',
      'ContextMenuGroup',
      'ContextMenuPortal',
      'ContextMenuSub',
      'ContextMenuSubContent',
      'ContextMenuSubTrigger',
      'ContextMenuRadioGroup',
    ],
    dependencies: ['@radix-ui/react-context-menu', '@radix-ui/react-icons'],
    template: ContextMenuTemplate,
  },
  dialog: {
    components: [
      'Dialog',
      'DialogPortal',
      'DialogOverlay',
      'DialogTrigger',
      'DialogClose',
      'DialogContent',
      'DialogHeader',
      'DialogFooter',
      'DialogTitle',
      'DialogDescription',
    ],
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons'],
    template: DialogTemplate,
  },
  drawer: {
    components: [
      'Drawer',
      'DrawerPortal',
      'DrawerOverlay',
      'DrawerTrigger',
      'DrawerClose',
      'DrawerContent',
      'DrawerHeader',
      'DrawerFooter',
      'DrawerTitle',
      'DrawerDescription',
    ],
    dependencies: ['vaul'],
    template: DrawerTemplate,
  },
  dropdownMenu: {
    components: [
      'DropdownMenu',
      'DropdownMenuTrigger',
      'DropdownMenuContent',
      'DropdownMenuItem',
      'DropdownMenuCheckboxItem',
      'DropdownMenuRadioItem',
      'DropdownMenuLabel',
      'DropdownMenuSeparator',
      'DropdownMenuShortcut',
      'DropdownMenuGroup',
      'DropdownMenuPortal',
      'DropdownMenuSub',
      'DropdownMenuSubContent',
      'DropdownMenuSubTrigger',
      'DropdownMenuRadioGroup',
    ],
    dependencies: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-icons'],
    template: DropdownTemplate,
  },
  input: {
    components: ['Input'],
    template: InputTemplate,
  },
  separator: {
    components: ['Separator'],
    dependencies: ['@radix-ui/react-separator'],
    template: SeparatorTemplate,
  },
  sheet: {
    components: [
      'Sheet',
      'SheetPortal',
      'SheetOverlay',
      'SheetTrigger',
      'SheetClose',
      'SheetContent',
      'SheetHeader',
      'SheetFooter',
      'SheetTitle',
      'SheetDescription',
    ],
    dependencies: ['@radix-ui/react-dialog', '@radix-ui/react-icons', 'class-variance-authority'],
    template: SheetTemplate,
  },
  sidebar: {
    components: [
      'Sidebar',
      'SidebarContent',
      'SidebarFooter',
      'SidebarGroup',
      'SidebarGroupAction',
      'SidebarGroupContent',
      'SidebarGroupLabel',
      'SidebarHeader',
      'SidebarInput',
      'SidebarInset',
      'SidebarMenu',
      'SidebarMenuAction',
      'SidebarMenuBadge',
      'SidebarMenuButton',
      'SidebarMenuItem',
      'SidebarMenuSkeleton',
      'SidebarMenuSub',
      'SidebarMenuSubButton',
      'SidebarMenuSubItem',
      'SidebarProvider',
      'SidebarRail',
      'SidebarSeparator',
      'SidebarTrigger',
    ],
    dependencies: [
      '@/hooks/use-mobile',
      '@/lib/utils',
      '@/components/ui/button',
      '@/components/ui/input',
      '@/components/ui/separator',
      '@/components/ui/sheet',
      '@/components/ui/skeleton',
      '@/components/ui/tooltip',
      'lucide-react',
    ],
    template: SidebarTemplate,
  },
  skeleton: {
    components: ['Skeleton'],
    template: SkeletonTemplate,
  },
  tooltip: {
    components: ['Tooltip', 'TooltipTrigger', 'TooltipContent', 'TooltipProvider'],
    dependencies: ['@radix-ui/react-tooltip'],
    template: TooltipTemplate,
  },
  typingEffect: {
    components: ['TypingEffect'],
    template: TypingEffectTemplate,
  },
};
