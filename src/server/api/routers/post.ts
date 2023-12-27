import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), body: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          body: input.body,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  delete: protectedProcedure.input(z.number()).mutation(({ ctx, input }) => {
    return ctx.db.post.delete({
      where: { id: input },
    });
  }),

  getLatest: protectedProcedure.input(z.number()).query(({ ctx,input }) => {
    const postCount = input || 1
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      take: postCount
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" }
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const id = parseInt(input);
    return ctx.db.post.findFirst({
      where: { id: isNaN(id) ? -1 : id },
    });
  }),

  getAllByUserId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const userId = input
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: userId}}
    })
  })
});
