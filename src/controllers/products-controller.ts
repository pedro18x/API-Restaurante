import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { string, z } from "zod";

class ProductController {
    async index(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const { name } = request.query;
            const products = await knex<ProductRepository>("products")
                .select()
                .whereLike("name", `%${name ?? ""}%`)
                .orderBy("name");
            return response.json({ products });
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const bodySchema = z.object({
                name: z.string({ required_error: "Name is required!" }).trim().min(4),
                price: z.number({ required_error: "Price is required" }).gt(0),
            });
            const { name, price } = bodySchema.parse(request.body);

            await knex<ProductRepository>("products").insert({ name, price });

            return response.status(201).json({ name, price });
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "Id must be a integer" })
                .parse(request.params.id);

            const bodySchema = z.object({
                name: z.string({ required_error: "Name is required!" }).trim().min(4).optional(),
                price: z.number({ required_error: "Price is required" }).gt(0).optional(),
            });
            const { name, price } = bodySchema.parse(request.body);

            const product = await knex<ProductRepository>("products").select().where({ id }).first();
            if (!product) {
                throw new AppError("product not found");
            }

            await knex<ProductRepository>("products")
                .update({ name, price, updated_at: knex.fn.now() })
                .where({ id });
            return response.json({ id, updated: true });
        } catch (error) {
            next(error);
        }
    }

    async remove(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const id = z
                .string()
                .transform((value) => Number(value))
                .refine((value) => !isNaN(value), { message: "Id must be a integer" })
                .parse(request.params.id);

            const product = await knex<ProductRepository>("products").select().where({ id }).first();
            if (!product) {
                throw new AppError("product not found");
            }

            await knex<ProductRepository>("products").delete().where({ id });
            return response.json({ id, deleted: true });
        } catch (error) {
            next(error);
        }
    }
}

export { ProductController };
