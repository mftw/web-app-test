<footer class="footer">
    <section class="footer__menu">
        <ul class="footer__menu-nav">
            <li>
                <a id="buttonfuck" href="#">
                    Kontakt
                </a>
            </li>
            <li>
                <a href="#">
                    Om os
                </a>
            </li>
            <li>
                <a href="#">
                    Karriere
                </a>
            </li>
        </ul>
        <ul class="footer__social">
            <li>
                <a href="#" class="icons">
                    <i class="fab fa-facebook-square"></i>
                </a>
            </li>
            <li>
                <a href="#" class="icons">
                    <i class="fab fa-twitter-square"></i>
                </a>
            </li>
            <li>
                <a href="#" class="icons">
                    <i class="fab fa-linkedin"></i>
                </a>
            </li>
            <li>
                <a href="#" class="icons">
                    <i class="fab fa-google-plus-square"></i>
                </a>
            </li>
        </ul>
    </section>
    <section class="footer__submenu">
        <div>
            © 2018 Canonical Ltd. Ubuntu and Canonical are registered trademarks of Canonical Ltd.
        </div>
        <ul>
            <li>
                <a href="#">
                    Legal information
                </a>
            </li>
            <li>
                <a href="#">
                    Data privacy
                </a>
            </li>
            <li>
                <a href="#">
                    Report a bug on this site
                </a>
            </li>
        </ul>
    </section>
</footer>

<!-- tilmelding -->
<section class="tilmelding">
    <div class="close-tilmeld" id="close-tilmeld">X</div>
    <h3>Tilmelding</h3>
    <form action="tilmeld" class="tilmeld">
        <label for="name">Dit fulde navn</label>
        <input type="text" id="name">
        <label for="adresse">Din adresse</label>
        <input type="text" id="adresse">
        <label for="land">Dit hjemland</label>
        <input type="text" id="land">
        <label for="email">Din adresse</label>
        <input type="text" id="email">
        <label for="interesse">Hoved interesse</label>
        <select id="interesse" name="interesse">
            <option value="" disabled selected>(pil ned)</option>
            <option value="iot">ioT</option>
            <option value="desktop">Desktop</option>
        </select>
        <div class="dage">
            <label>Hvilke dage</label>
            <label><input type="checkbox" name="dage" value="mandag"><span>Mandag</span></label>
            <label><input type="checkbox" name="dage" value="tirsdag"><span>Tirsdag</span></label>
            <label><input type="checkbox" name="dage" value="onsdag"><span>Onsdag</span></label>
            <label><input type="checkbox" name="dage" value="torsdag"><span>Torsdag</span></label>
            <label><input type="checkbox" name="dage" value="fredag"><span>Fredag</span></label>
            <label><input type="checkbox" name="dage" value="lørdag"><span>Lørdag</span></label>
            <label><input type="checkbox" name="dage" value="søndag"><span>Søndag</span></label>
        </div>
        <input type="submit" value="Submit">
    </form>


</section>

<script src="js/nav.js"></script>
</body>

</html>