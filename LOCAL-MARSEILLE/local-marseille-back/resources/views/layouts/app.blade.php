@include('partials.header')
<body>
    <div class="main">
        @include('partials.nav')
        @yield("content")
    </div>
</body>
</html>