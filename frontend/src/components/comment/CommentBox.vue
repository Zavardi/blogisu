<template>
    <div class="comment-box">
        <div class="AddComment">
            <add-comment></add-comment>
        </div>
        <div class="ListComment">
            <list-comment></list-comment>
        </div>
    </div>
</template>


<script>
import AddComment from "@/components/comment/AddComment.vue";
import ListComment from "@/components/comment/ListComment.vue";
export default {
    name: "CommentBox",
    data() {
        return {
            comment: [],

        };
    },
    components: {
        AddComment,
        ListComment
    },
}

</script>
