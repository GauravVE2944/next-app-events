import { Document, model, models, Schema } from "mongoose";

export interface ICategory extends Document{
    name: string;
    icon: string;
}
const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
    }
);

const Categories = (models.Categories as any) || model<ICategory>('Categories', categorySchema);
export default Categories;