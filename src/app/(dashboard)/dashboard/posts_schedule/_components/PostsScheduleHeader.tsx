"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';

const PostsScheduleHeader = () => {
    const [modal, setModal] = useState(false)
    const handleNewPost = () => {
        setModal(true)
    }
    return (
        <div className='grid grid-cols-4 gap-3 items-center'>
            <div className='col-span-2'>
                <h2 className='font-semibold text-3xl'>Posts & Scheduling</h2>
                <span className='text-sm'>Create, schedule, and manage your content</span>
            </div>
            <div className='col-span-1'>
                <Select>
                    <SelectTrigger className="w-[250px] px-6 py-6 border rounded-full">
                        <SelectValue placeholder="Select Page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='border rounded-full' value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className='col-span-1'>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-colors duration-200 cursor-pointer" onClick={handleNewPost}>
                    <Plus size={20} />
                    Add New Post
                </button>
            </div>
            <CreatePostModal isOpen={modal} onClose={() => setModal(false)} />
        </div>
    );
};

export default PostsScheduleHeader;