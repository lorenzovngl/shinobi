<!DOCTYPE html>
<html>
<head>
    <title>Giapponese</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/quiz.css?v=1">
</head>
<body>
<div class="container-fluid d-flex align-items-center justify-content-center">
    <div style="min-width: 50%">
        <div class="row">
        <div class="col d-flex justify-content-center">
                <button type="button" class="btn btn-light" data-toggle="modal" data-target="#settings-modal">
                    Choose level
                </button>
            </div>
            <div class="col d-flex justify-content-center">
                <button type="button" class="btn btn-light" data-toggle="modal" data-target="#kana-modal">
                    Hiragana symbols
                </button>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col d-flex justify-content-center">
                <h1>忍者 Shinobi</h3>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <h3 id="level"></h3>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <h5 id="level-desc"></h5>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
        <?php
            for ($i=0; $i < 10; $i++) { ?>
                <span class="dot"></span>
            <?php } ?>
        </div>
        <div class="row">
            <div class="col" id="question">
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div id="answer" class="alert alert-success" role="alert">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <input type="text" class="form-control" id="guess">
            </div>
        </div>
        <div class="row m-3">
            <div class="col-12 mt-2 d-flex justify-content-center">
                <button id="check" type="submit" class="btn btn-primary disabled">Submit</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="settings-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Settings</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                        <?php
                        $labels = ["Vowels", "K-", "S-", "T-", "N-", "H-", "M-", "Y-", "R-",
                        "W- and N", "tenten and maru", "-YA, -YU, -YO", "-YA, -YU, -YO with tenten and maru"];
                        for ($i=0; $i < count($labels); $i++) { ?>
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-light btn-level">
                                    <span class="value" style="display:none"><?php echo $i+1 ?></span>
                                    <?php echo "Level ".($i+1)." - ".($i == 0 ? $labels[$i] : "Group ".$labels[$i]) ?>
                                </button>
                            </div>
                        </div>
                        <?php } ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="kana-modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Hiragana symbols</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <?php include 'kana.html' ?>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<div id="modal-alert" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Message</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>
<script type="text/javascript" src="translator.js"></script>
<script type="text/javascript" src="utils.js"></script>
<script type="text/javascript" src="quiz.js?v=5"></script>
</body>
</html>