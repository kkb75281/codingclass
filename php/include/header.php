<header id="header">
        <div class="header__inner container">
            <div class="left">
                <ul>
                    <li><a href="../main/main.php" class="star">πΏ</a></li>
                </ul>
            </div>
            <h1><a href="../main/main.php">PHP BLOG with scss</a></h1>
            <div class="right">
                <ul>
                    <?php if( isset($_SESSION['myMemberID'])){ ?>
                            <li><a href="#" class="black"><?=$_SESSION['youName']?>λ νμν©λλ€:)</a></li>
                            <li><a href="../login/logout.php">λ‘κ·Έμμ</a></li>
                    <?php }else {   ?>
                            <li><a href="#" class="loginBtn">LOGIN</a></li>
                            <li><a href="../login/join.php">νμκ°μ</a></li>
                    <?php  }   ?>
                </ul>

            </div>
            <nav class="nav">
                <ul>
                    <li><a href="../login/join.php">νμκ°μ</a></li>
                    <li><a href="../board/board.php">κ²μν</a></li>
                    <li><a href="../blog/blog.php">λΈλ‘κ·Έ</a></li>
                    <li><a href="#">μ°λ½μ²</a></li>
                </ul>
            </nav>
        </div>
    </header>
    <!-- //header -->