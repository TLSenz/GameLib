package gibb.losve.gameLib.pipeline.pipeline;

import org.springframework.scheduling.annotation.Scheduled;

public class PipelineScheduler{




    public void initiatePipeline(){


        // cals Game Ingestion Service and gets data, Game ingestion service writes Data to Repository
        // calls asyncronsly the Achivements API
        // the

    }





    @Scheduled(cron = "0 3 * * *", zone = "Europe/Berlin")
    private void schedulePipeline(){
            initiatePipeline();
    }





}
