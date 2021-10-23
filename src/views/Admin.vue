<template>
    <div class="admin">
        <div class="container">
            <h2>Administration</h2>
            <div class="admin-info">
                <h2>Add Admin</h2>
                <div class="input">
                    <input placeholder="Enter user email to make them an Admin" type="text" id="addAdmins" v-model="adminEmail">
                </div>
                <span>{{ this.functionMsg }}</span>
                <button class="button">Submit</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                adminEmail:"",
                functionMsg:null
            }
        }
    }
</script>

<style lang="scss" scoped>
.admin{
    .container{
        max-width: 1000px;
        padding: 60px 25px;

        h2{
            text-align: center;
            margin-bottom:16px;
            font-weight:300;
            font-size: 32px;
        }

        .admin-info{
            border-radius: 8px;
            box-shadow:  0px 4px 6px -1px rgba( 0 , 0 , 0 , .1) , 0 2px 4px -1px rgba(0 , 0 , 0 , .6);
            padding: 32px;
            background:  #eee;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;
        }

        span{
            font-size: 14px;
        }

        input{
            width: 100%;
            border: none;
            background:  rgb(189, 189, 243);
            padding: 8px;
            height: 50px;
            @media (min-width: 900px) {
                
            }

            &:focus{
                outline: none;
            }
        }
    }
    .button{
            align-self: center;
            background:  rgb(8, 8, 102);
            border: 1px solid  rgb(8, 8, 102);
            padding: 8px;
            color: #fff;
            font-weight: 600;
            border-radius: 4px;
    }
}
</style>