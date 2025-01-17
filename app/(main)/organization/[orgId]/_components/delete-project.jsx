"use client"
import { deleteProject } from '@/actions/projects';
import { Button } from '@/components/ui/button';
import useFetch from '@/hooks/use-fetch';
import { useOrganization } from '@clerk/nextjs'
import { animate } from 'framer-motion';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const DeleteProject = ({ projectId }) => {

    const router = useRouter()
    const { data: deleted, loading: isDeleting, error, fn: deleteProjectFn } = useFetch(deleteProject)

    const handleDelete = () => {

        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProjectFn(projectId)
        }

    }



    useEffect(() => {
        if (deleted?.success) {
            toast.success("project deleted successfully")
            router.refresh()
        }
    }, [deleted])

    const { membership } = useOrganization()

    const isAdmin = membership?.role === "org:admin";

    if (!isAdmin) {
        return null
    }
    return (
        <>
            <Button variant="ghost" onClick={handleDelete} disabled={isDeleting} className={`${isDeleting ? "animate-pulse" : ""}`}>

                <Trash2Icon className='h-4 w-4 text-red-500'></Trash2Icon>

            </Button>


            {error && <p className='text-red-500 text-sm'> {error.message}</p>}
        </>



    )
}

export default DeleteProject
