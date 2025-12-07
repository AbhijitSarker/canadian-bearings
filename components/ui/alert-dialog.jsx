"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const AlertDialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in" 
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      {/* Dialog */}
      {children}
    </div>
  );
};

const AlertDialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-white p-6 opacity-100 shadow-lg animate-in fade-in-90 zoom-in-90 sm:rounded-lg md:w-full",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold text-gray-900", className)}
    {...props}
  />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = React.forwardRef(({ className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    onClick={onClick}
    {...props}
  />
));
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = React.forwardRef(({ className, onClick, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0",
      className
    )}
    onClick={onClick}
    {...props}
  />
));
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
