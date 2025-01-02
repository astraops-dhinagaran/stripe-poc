import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ProductFormSchema } from "../schemas/products.schema";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import { PostAxiosServiceWithToken } from "../../../libs/axiosservice/axios.service";
import { productListEndPoint } from "../product.endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function ProductForm({setShowProductForm}: {setShowProductForm: (value: boolean) => void}) {

    const queryClient = useQueryClient();

    const [planFeatures, setPlanFeatures] = useState<string[]>([]);
    const [planFeature, setPlanFeature] = useState<string>('');
    const [isCreditCardRequired, setIsCreditCardRequired] = useState<boolean>(false);

    const addPlanFeature = () => {
        if (planFeature.trim() !== '') {
            setPlanFeatures([...planFeatures, planFeature]);
            setPlanFeature('');
        }
    }

    const removePlanFeature = (index: number) => {
        setPlanFeatures(planFeatures.filter((_, i) => i !== index));
        setPlanFeature('');
    }

    const { mutate } = useMutation({
        mutationFn: (data: FieldValues) => PostAxiosServiceWithToken({url: productListEndPoint, body: data}),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            setShowProductForm(false);
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>(
        {
            resolver: zodResolver(ProductFormSchema)
        }
    );

    const onSubmit = async (data: FieldValues) => {
        if (planFeatures.length !== 0) {
            data.features = planFeatures;
            data.isCreditCardRequired = isCreditCardRequired;
            mutate(data);
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Plan Details</h1>
            <div className="grid grid-cols-2 gap-2">
                <div className="my-2">
                    <InputText placeholder="Plan Name" {...register('name')} />
                    {errors.name && <p className="text-red-500">{errors.name.message as string}</p>}
                </div>
                <div className="my-2">
                    <InputText placeholder="Plan Price" type="number" {...register('price')} />
                    {errors.price && <p className="text-red-500">{errors.price.message as string}</p>}
                </div>
                <div className="my-2 col-span-2">
                    <InputTextarea placeholder="Plan Description" {...register('description')} />
                    {errors.description && <p className="text-red-500">{errors.description.message as string}</p>}
                </div>
                <div className="my-2 col-span-2 flex items-center gap-2">
                    <label htmlFor="isCreditCardRequired">Credit Card Required</label>
                    <SelectButton options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]} optionLabel="label" optionValue="value" value={isCreditCardRequired} onChange={(e) => setIsCreditCardRequired(e.value)} />
                </div>
                <div className="my-2 col-span-2 flex gap-2">
                    <InputText className="w-full" placeholder="Plan Features" value={planFeature} onChange={(e) => {
                        e.preventDefault();
                        setPlanFeature(e.target.value);
                    }} />
                    <Button type="button" onClick={() => addPlanFeature()} className="w-fit ">Add</Button>
                </div>
            </div>

            <div className="my-2">
                <h1>Plan Features</h1>
                {planFeatures.map((feature, index) => (
                    <div className="my-2 card bg-slate-200 p-2 rounded-md" key={index}>
                        <div className="flex justify-between">
                            <p>{feature}</p>
                            <Button type="button" className="w-fit bg-red-500 text-white" onClick={() => removePlanFeature(index)}><i className="pi pi-trash" /></Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-end gap-2">
                <Button type="button" onClick={() => setShowProductForm(false)} className="bg-slate-300 text-gray-500">Cancel</Button>
                <Button type="submit">Create</Button>
            </div>
        </form>
    );
}

export default ProductForm;