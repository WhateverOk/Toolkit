function isInside( pos, rect) { //to check mouse pos and rectangle pos
    if ((pos.x > rect.x) && (pos.x < (rect.x+rect.w)) ) {
        if(( pos.y < (rect.y+rect.h) && (pos.y > rect.y))) {
            return true;
        }
        else    
            return false ;
    }
    else
        return false ;
}