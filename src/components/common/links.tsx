import clsx from "clsx";
import NextLink from "next/link";

// import { useHeaderStyles } from "./styles";

const headerLinks = [
  {
    href: "/",
    label: "Designs",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

export const HeaderLinks = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <section
      className={clsx(
        "flex items-stretch flex-col gap-5 sm:flex-row sm:items-center sm:gap-3 md:gap-4",
        className
      )}
      {...props}
    >
      {headerLinks.map((link) => (
        <NextLink
          key={link.href}
          href={link.href}
          className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded"
        >
          {link.label}
        </NextLink>
      ))}
    </section>
  );
};

export const FooterLinks = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <section
      className={clsx(
        "flex items-stretch flex-col gap-5 sm:flex-row sm:items-center sm:gap-3 md:gap-4",
        className
      )}
      {...props}
    >
      <NextLink
        href="/terms-conditions"
        className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded"
      >
        Terms & Conditions
      </NextLink>
      <NextLink
        href="/privacy"
        className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded"
      >
        Privacy Policy
      </NextLink>
    </section>
  );
};
