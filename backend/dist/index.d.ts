import "./config/passport";
export declare const prisma: import("@prisma/client/runtime/library").DynamicClientExtensionThis<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/library").InternalArgs & {
    result: {};
    model: {
        $allModels: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        user: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        apiKey: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        wallet: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        socialAuthMapping: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        session: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        transaction: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        phoneVerification: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        emailVerification: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        analytics: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        apiKeyUsage: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
    };
    query: {};
    client: {
        $accelerate: () => {
            invalidate: (input: import("@prisma/extension-accelerate").AccelerateInvalidateInput) => Promise<{
                requestId: string;
            }>;
            invalidateAll: () => Promise<{
                requestId: string;
            }>;
        };
    };
}, {}>, import(".prisma/client").Prisma.TypeMapCb<{
    log: ("info" | "error" | "warn" | "query")[];
}>, {
    result: {};
    model: {
        $allModels: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        user: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        apiKey: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        wallet: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        socialAuthMapping: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        session: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        transaction: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        phoneVerification: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        emailVerification: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        analytics: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
        apiKeyUsage: {
            aggregate: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "aggregate"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "aggregate">>;
            count: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "count"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "count">>;
            findFirst: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirst"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirst"> | null>;
            findFirstOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findFirstOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findFirstOrThrow">>;
            findMany: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findMany"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args?: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findMany">>;
            findUnique: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUnique"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUnique"> | null>;
            findUniqueOrThrow: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "findUniqueOrThrow"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; } & (ActualArgs extends {
                select: unknown;
                include: unknown;
            } ? "Please either choose `select` or `include`." : ActualArgs extends {
                select: unknown;
                omit: unknown;
            } ? "Please either choose `select` or `omit`." : unknown)) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "findUniqueOrThrow">>;
            groupBy: () => <This, FormalArgs extends import("@prisma/client/runtime/library").Args<This, "groupBy"> & import("@prisma/extension-accelerate").PrismaCacheStrategy, const ActualArgs extends FormalArgs>(this: This, args: { [key in keyof ActualArgs]: key extends keyof FormalArgs ? ActualArgs[key] : never; }) => import("@prisma/extension-accelerate").AcceleratePromise<import("@prisma/client/runtime/library").Result<This, ActualArgs, "groupBy">>;
        };
    };
    query: {};
    client: {
        $accelerate: () => {
            invalidate: (input: import("@prisma/extension-accelerate").AccelerateInvalidateInput) => Promise<{
                requestId: string;
            }>;
            invalidateAll: () => Promise<{
                requestId: string;
            }>;
        };
    };
}>;
declare const app: import("express-serve-static-core").Express;
export default app;
//# sourceMappingURL=index.d.ts.map