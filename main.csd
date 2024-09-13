<CsoundSynthesizer>
    
    <CsOptions>
        -odac
    </CsOptions>

    <CsInstruments>
        
        instr 1
            out linenr(oscili(0dbfs*p4,p5),0.01,0.5,0.01)
        endin
        schedule(1,0,1,0.2,A4)
    
    </CsInstruments>

    <CsScore>

    </CsScore>

</CsoundSynthesizer>