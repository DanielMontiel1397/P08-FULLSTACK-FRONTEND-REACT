import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import MensajeErrorInput from './MensajeErrorInput';
import { type ClienteFormType, type ClienteType } from '../types/clienteTypes/ClienteType';
import { clienteFormSchema } from '../schemas/clients/clientesSchema';


// 🎨 Props del componente
interface CreateProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ClienteFormType) => void;
    mode: 'create';
    cliente?: never;
}

interface EditProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<ClienteFormType>) => void;
    mode: 'edit';
    cliente?: ClienteType;
}

type ClienteFormModalProps = CreateProps | EditProps;

export default function ClienteFormModal({
    isOpen,
    onClose,
    onSubmit,
    cliente,
    mode
}: ClienteFormModalProps) {

    // 📝 React Hook Form
    const { register, handleSubmit, formState: { errors, dirtyFields }, reset } = useForm<ClienteFormType>({
        resolver: zodResolver(clienteFormSchema),
        defaultValues: {
            name: '',
            phone: '',
            age: '',
            membership_type: 'mes'
        }
    });

    // 🔄 Resetear formulario cuando cambia el modal o el cliente
    useEffect(() => {
        if (isOpen) {
            if (mode === 'edit' && cliente) {
                reset({
                    name: cliente.name,
                    phone: cliente.phone,
                    age: cliente.age.toString(),
                    membership_type: cliente.membership_type
                });
            } else {
                reset({
                    name: '',
                    phone: '',
                    age: '',
                    membership_type: 'mes'
                });
            }
        }
    }, [isOpen, mode, cliente, reset]);

    // 💾 Manejar envío del formulario
    const handleFormSubmit = (data: ClienteFormType ) => {

        if (mode === 'create') {
            onSubmit(data);
            onClose();
            return;
        }

        const payload: Partial<ClienteFormType> = {};

        (Object.keys(dirtyFields) as Array<keyof ClienteFormType>).forEach((key) => {
            payload[key] = data[key] as never;
        });

        if (Object.keys(payload).length === 0) return;

        onSubmit(payload);
        onClose();
    };

    // ❌ Cerrar y resetear
    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className="relative z-50"
            transition
        >
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/70 transition duration-300 data-closed:opacity-0"
                aria-hidden="true"
            />

            {/* Contenedor del modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">

                {/* Panel del modal */}
                <DialogPanel
                    transition
                    className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl transition duration-300 data-closed:scale-95 data-closed:opacity-0"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">👤</span>
                        <DialogTitle
                            as="h3"
                            className="text-2xl font-semibold text-zinc-100"
                        >
                            {mode === 'create' ? 'Crear Cliente' : 'Editar Cliente'}
                        </DialogTitle>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

                        {/* Campo: Nombre */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                placeholder="Juan Pérez García"
                                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                {...register('name')}
                            />
                            {errors.name?.message && (
                                <MensajeErrorInput>{errors.name.message}</MensajeErrorInput>
                            )}
                        </div>

                        {/* Campo: Teléfono */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                placeholder="4431234567"
                                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                {...register('phone')}
                            />
                            {errors.phone?.message && (
                                <MensajeErrorInput>{errors.phone.message}</MensajeErrorInput>
                            )}
                        </div>

                        {/* Campo: Edad */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Edad
                            </label>
                            <input
                                type="number"
                                placeholder="25"
                                min="10"
                                max="120"
                                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                {...register('age')}
                            />
                            {errors.age?.message && (
                                <MensajeErrorInput>{errors.age.message}</MensajeErrorInput>
                            )}
                        </div>

                        {/* Campo: Tipo de Membresía */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Tipo de Membresía
                            </label>
                            <select
                                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                defaultValue={'mes'}
                                {...register('membership_type')}
                            >
                                <option value="semana">Semanal</option>
                                <option value="mes">Mensual</option>
                                <option value="anualidad">Anual</option>
                            </select>
                            {errors.membership_type?.message && (
                                <MensajeErrorInput>{errors.membership_type.message}</MensajeErrorInput>
                            )}
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-3 pt-4 border-t border-zinc-800">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-750 transition-colors hover:cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors hover:cursor-pointer"
                            >
                                {mode === 'create' ? 'Crear Cliente' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}