<template>
    <ul class="ApplicationUser list-group">
        <li class="list-group-item">
            <img class="img-circle media-object pull-left" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540462959&di=f8af7998dcbacab51fc8c8f3dab16c9a&imgtype=jpg&er=1&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3Db1e77ebfc395d143da23ec2746c0ae34%2Fdc54564e9258d109409e3b0eda58ccbf6c814d09.jpg" width="32" height="32">
            <div class="media-body">
                <strong>List item title</strong>
                <p>Lorem ipsum dolor sit amet.</p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
  name: 'ApplicationUser'
}
</script>

<style lang="scss" scoped>
.ApplicationUser.list-group {
  .list-group-item {
    .media-body {
        strong,p {
            color: #ccc !important;
        } 
    }
  }
}
</style>
