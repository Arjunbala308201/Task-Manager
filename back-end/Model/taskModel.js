import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    task: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: "Due date must not be earlier than today.",
        },
    },
    priority: {
        type: String,
        default: "Low",
    },
    assignedTo: {
        type: String,
        required: true,
    },
});

const tasks = mongoose.model("task", taskSchema);

export default tasks;
