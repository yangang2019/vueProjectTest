<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="addComments">发表评论</mt-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="i">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
                </div>
            </div>

        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "comments",
        data(){
            return {
                pageindex:1,
                comments: [],
                msg: ''
            }
        },
        created(){
            this.getComments();
        },
        methods: {
            getComments(){
                this.$http.get('api/getcomments/'+this.newsid+'?pageindex='+this.pageindex).then(result => {
                    if(result.body.status === 0){
                        this.comments=this.comments.concat(result.body.message);
                    }else {
                        Toast('获取评论失败！');
                    }

                });
            },
            getMore(){
                // 加载更多
                this.pageindex++;
                this.getComments();
            },
            addComments(){
                if(this.msg.trim().length === 0) return Toast('请输入评论内容');
                this.$http.post('api/postcomment/'+this.$route.params.id,{ content: this.msg.trim() }).then(result =>{
                    console.log(result.body.status);
                    if(result.body.status === 0){
                        this.comments.unshift({user_name:'匿名用户', add_time:Date.now(), content: this.msg});
                        this.msg = "";
                        Toast('评论提交成功！');
                    }else {
                        Toast('添加评论失败！');
                    }
                })
            }
        },
        props:['newsid']
    }
</script>

<style scoped lang="less">
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    line-height: 30px;
                    background-color: #ccc;
                }
                .cmt-body {
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>