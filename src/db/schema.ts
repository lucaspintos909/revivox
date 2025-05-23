import { integer, pgTable, varchar, text, decimal, boolean, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  short_description: text('short_description').notNull().default(''),
  description: text('description').notNull(),
  image: text('image').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  discount: decimal('discount', { precision: 10, scale: 2 }).notNull(),
  sold: boolean('sold').default(false),
  type: text('type', { enum: ['laptop', 'minipc', 'accessory', 'other'] }).notNull().default('laptop'),
  sale_link: text('sale_link'),
  specs: jsonb('specs').default({
    processor: '',
    ram: '',
    storage: '',
    display: '',
    os: '',
    condition: 'Reacondicionado',
    extras: {
      fingerprint: false,
      facialRecognition: false,
      backlitKeyboard: false,
      touchScreen: false,
      thunderbolt: false,
      hdmi: false,
      usbC: false,
      webcam: false,
      bluetooth: false,
      wifi6: false
    }
  }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          description: string
          image: string
          price: number
          sold: boolean
          type: 'laptop' | 'services' | 'accessory' | 'other'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          image: string
          price: number
          sold?: boolean
          type: 'laptop' | 'services' | 'accessory' | 'other'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          image?: string
          price?: number
          sold?: boolean
          type?: 'laptop' | 'services' | 'accessory' | 'other'
          created_at?: string
        }
      }
    }
  }
}
