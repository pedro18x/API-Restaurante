import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class TablesSessionsController {
    async index(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const tableSessions = await knex<TablesSessionsRepository>("tables_sessions").orderBy("closed_at");
            return response.json(tableSessions);
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const bodySchema = z.object({
                table_id: z.number(),
            });

            const { table_id } = bodySchema.parse(request.body);

            const session = await knex<TablesSessionsRepository>("tables_sessions")
                .where({ table_id })
                .orderBy("opened_at", "desc")
                .first();

            if (session && !session.closed_at) {
                throw new AppError("This table is already Open!");
            }

            await knex<TablesSessionsRepository>("tables_sessions").insert({
                table_id,
                opened_at: knex.fn.now(),
            });
            return response.status(201).json({});
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value))
                .parse(request.params.id);

            const session = await knex<TablesSessionsRepository>("tables_sessions").where({ id }).first();

            if (!session) {
                throw new AppError("Session not Found!");
            }

            if (session.closed_at) {
                throw new AppError("This sessions is already closed!");
            }

            await knex<TablesSessionsRepository>("tables_sessions")
                .update({ closed_at: knex.fn.now() })
                .where({ id });

            return response.json(session);
        } catch (error) {
            next(error);
        }
    }
}

export { TablesSessionsController };
