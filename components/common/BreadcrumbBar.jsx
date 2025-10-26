"use client"

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { exclude as excludePatterns } from "../../configs/breadcrumb.config";

const labelize = (seg) => {
  if (!seg) return "Home";
  const map = {
    search: "Search",
    auth: "Auth",
    signin: "Sign In",
    register: "Register",
  };
  return map[seg] ?? seg.replace(/[-_]/g, " ").replace(/\b\w/g, (s) => s.toUpperCase());
};

export default function BreadcrumbBar({ className = "container mx-auto px-4 py-4" }) {
  const pathname = usePathname() || "/";

  // Route-level override via meta tag in the head: <meta name="hide-breadcrumb" content="true" />
  try {
    if (typeof document !== "undefined") {
      const m = document.querySelector('meta[name="hide-breadcrumb"]');
      if (m && /^(1|true)$/i.test(m.getAttribute("content") || "")) return null;
    }
  } catch (e) {
    /* ignore in non-browser environments */
  }

  // Configurable exclude patterns (array of regex strings)
  if (Array.isArray(excludePatterns)) {
    for (const pat of excludePatterns) {
      try {
        const re = new RegExp(pat);
        if (re.test(pathname)) return null;
      } catch (e) {
        // ignore invalid regex patterns
        // eslint-disable-next-line no-console
        console.warn("Invalid breadcrumb exclude pattern:", pat);
      }
    }
  }
  const parts = pathname.split("/").filter(Boolean);

  // build cumulative paths
  const items = [{ href: "/", label: "Home" }];
  let acc = "";
  parts.forEach((p) => {
    acc += `/${p}`;
    items.push({ href: acc, label: labelize(p) });
  });

  return (
    <div className={className}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((it, idx) => (
            <BreadcrumbItem key={it.href}>
              {idx < items.length - 1 ? (
                <BreadcrumbLink href={it.href}>{it.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{it.label}</BreadcrumbPage>
              )}

              {idx < items.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
