# Render {"children":{"1":"a","2":"b","3":"c"}}
```html
<html>
  <head />
  <body>
    <div>
      <p>
        1
        <!--M_*1 #text/0-->
        : 
        <!---->
        a
        <!--M_*1 #text/1-->
      </p>
      <p>
        2
        <!--M_*2 #text/0-->
        : 
        <!---->
        b
        <!--M_*2 #text/1-->
      </p>
      <p>
        3
        <!--M_*3 #text/0-->
        : 
        <!---->
        c
        <!--M_*3 #text/1-->
      </p>
      <!--M_|0 #text/0 1,2,3-->
      <p>
        1
        <!--M_*4 #text/0-->
      </p>
      <p>
        2
        <!--M_*5 #text/0-->
      </p>
      <p>
        3
        <!--M_*6 #text/0-->
      </p>
      <!--M_|0 #text/1 4,5,6-->
    </div>
    <script>
      WALKER_RUNTIME("M")("_");M._.r=[_=&gt;(_.i={0:{"#text/0(":new Map(_.a=[["1",_.c={}],["2",_.d={}],["3",_.e={}]]),"#text/1(":new Map(_.b=[["1",_.f={}],["2",_.g={}],["3",_.h={}]])},1:_.c,2:_.d,3:_.e,4:_.f,5:_.g,6:_.h}),0]
    </script>
  </body>
</html>
```

# Mutations
```

```