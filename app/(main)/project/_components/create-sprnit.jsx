"use client"
import { createSprint } from '@/actions/sprints'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, format } from 'date-fns'
import { Calendar } from 'lucide-react'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { DayPicker } from 'react-day-picker'
import "react-day-picker/style.css";
import useFetch from '@/hooks/use-fetch'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { sprintSchema } from '@/lib/validators'
const SprintCreationForm = ({ projectTitle, projectKey, projectId, sprintKey }) => {
    const router=useRouter()
    const [showForm, setShowForm] = useState(false)
    const [dateRange, setDateRange] = useState({ from: new Date(), to: addDays(new Date(), 14) })
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: zodResolver(sprintSchema),
        defaultValues: {
            name: `${projectKey}-${sprintKey}`,

            startDate: dateRange.from,
            endDate: dateRange.to

        }
    })
    const { loading: createSpritLoading, fn: createSpiritFn, } = useFetch(createSprint)

    const onSubmit = async (data) => {

        await createSpiritFn(projectId,{...data,
            startDate:dateRange.from,
            endDate:dateRange.to
        })


        setShowForm(false)
        toast.success("Sprint created Successfully.")
        router.refresh()

    }

    return (
        <>
            <div className='flex justify-between items-center '><h1 className='text-5xl font-bold mb-8 gradient-title '>{projectTitle}</h1>

                <Button className="mt-2" variant={showForm ? "destructive" : "punda"} onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Create New Spirit'}</Button></div>

            {showForm && (
                <Card className="pt-4 mb-4">
                    <CardContent>
                        <form className='flex gap-4 items-end' onSubmit={handleSubmit(onSubmit)}>

                            <div className='flex-1'>
                                <label className='block text-sm font-medium mb-1' htmlFor="name">Sprint Name</label>
                                <Input id="name" readOnly className="bg-slate-950 text-white" {...register("name")}></Input>

                                {errors.name && (<p className='text-red-500 text-xs'>{errors.name.message}</p>)}
                            </div>




                            <div className='flex-1'>

                                <label className='block text-sm font-medium mb-1'>Sprint Duration</label>


                                <Controller control={control} name='dateRange' render={({ field }) => {

                                    return (
                                        <Popover>

                                            <PopoverTrigger asChild>

                                                <Button variant='outline' className={`w-full justify- font-normal  ${!dateRange && 'text-muted-foreground'}`}>

                                                    <Calendar className='mr-2 h-4 w-4'></Calendar>

                                                    {dateRange.from && dateRange.to ? (
                                                        format(dateRange.from, "LLL dd,y") + " - " + format(dateRange.to, "LLL dd,y")
                                                    ) : (
                                                        <span>Pick a Date</span>
                                                    )}
                                                </Button>

                                            </PopoverTrigger>

                                            <PopoverContent className="w-auto bg-gray-600" align="start">

                                                <DayPicker classNames={{
                                                    chevron: 'fill-blue-500',
                                                    range_start: "bg-blue-700 rounded-full",
                                                    range_end: "bg-blue-700 rounded-full",
                                                    range_middle: "bg-blue-400 rounded-2xl ",
                                                    day_button: "border-none",
                                                    today: "  rounded-full",

                                                }} mode="range" selected={dateRange} onSelect={(range) => {
                                                    if (range?.from && range?.to) {
                                                        setDateRange(range)
                                                        field.onChange(range)
                                                    }
                                                }}></DayPicker>
                                            </PopoverContent>
                                        </Popover>
                                    )

                                }}>




                                </Controller>
                            </div>


                            <Button type="submit" disabled={createSpritLoading}>{createSpritLoading ? 'creating..' : 'Create Spirit'}</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

export default SprintCreationForm
